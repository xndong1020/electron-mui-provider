import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import { ErrorType } from "../constants";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

ajv.addKeyword({
  keyword: "maxEditorLength",
  type: "string",
  validate: (schema: any, data: any): boolean => {
    try {
      // Schema is the value of maxEditorLength
      if (data?.replace(/(<([^>]+)>)/gi, "")?.length > parseInt(schema)) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },
  errors: true,
});

ajv.addKeyword({
  keyword: "isNotEmpty",
  type: "string",
  validate: (schema: any, data: any): boolean => {
    return typeof data === "string" && data.trim() !== "";
  },
  errors: false,
});

export const validateJsonData = (
  schema: Record<string, unknown>,
  data: any
) => {
  const compile = ajv.compile(schema);
  const valid = compile(data);
  if (compile.errors) {
    console.error("Validating model errors: ", JSON.stringify(compile.errors));
  }
  return {
    valid,
    errors: compile.errors && parseErrors(compile.errors),
  };
};

const parseErrors = (
  errors: ErrorObject<string, Record<string, any>, unknown>[]
) => {
  const messages = errors.map((err) => toErrMessage(err));
  return messages;
};

const toErrMessage = (err: any): string => {
  const { keyword, message, params, instancePath } = err;
  // log.info(message, "<>", keyword, "<>", params);
  const objKeyPath = instancePath.slice(1).replace(/\//g, ".");
  let errorMsg;
  switch (keyword) {
    case ErrorType.Enum: {
      errorMsg = "is not one of the allowed values.";
      break;
    }
    case ErrorType.Required: {
      errorMsg = `'${params.missingProperty}' is required.`;
      break;
    }
    case ErrorType.AdditionalProperties: {
      errorMsg = `'${params.additionalProperty}' is not a valid property.`;
      break;
    }
    default: {
      errorMsg = message.toLowerCase();
      break;
    }
  }

  if (objKeyPath.trim()) {
    errorMsg = `[${objKeyPath}] ${errorMsg}`;
  }
  return errorMsg;
};
