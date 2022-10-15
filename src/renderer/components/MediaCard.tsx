import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface MediaCardProps {
  description: string;
  imgUrl: string;
  altText?: string;
  linkTo: string;
  sx?: Record<string, string>;
}

const MediaCard = ({
  description,
  imgUrl,
  altText,
  linkTo,
  sx = {},
}: MediaCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkTo);
  };

  return (
    <Card
      sx={{ ...sx, maxWidth: 345, cursor: "pointer" }}
      onClick={handleClick}
    >
      <CardMedia component="img" height="140" image={imgUrl} alt={altText} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
