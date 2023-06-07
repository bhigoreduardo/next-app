import { useState } from "react";
import { styled } from "styled-components";

const ImageSelectedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 200px;
`;
const SelectedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 1px solid #ccc;
  ${(props) =>
    props.$active
      ? `
    border-color: #ccc;
  `
      : `
    border-color: transparent;
    opacity: 0.7;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export default function ProductImages({ title, images }) {
  const [imageSelected, setImageSelected] = useState(images?.[0]);

  return (
    <div>
      <ImageSelectedWrapper>
        <SelectedImage
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/${imageSelected}`}
          alt={title}
        />
      </ImageSelectedWrapper>

      <ImageButtons>
        {images?.length > 0 &&
          images.map((item, i) => (
            <ImageButton
              key={i}
              onClick={() => setImageSelected(item)}
              $active={imageSelected === item}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/public/${item}`}
              />
            </ImageButton>
          ))}
      </ImageButtons>
    </div>
  );
}
