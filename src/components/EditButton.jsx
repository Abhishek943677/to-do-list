import React, { useRef } from 'react';
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";


function EditButton() {
  const clickSoundRef = useRef(null);

  const handleClick = () => {
    // Play the click sound
    clickSoundRef.current.play();
  };

  return (
    <div>
      <button onClick={handleClick}> <BorderColorRoundedIcon /></button>
      {/* Hidden audio element for click sound */}
      <audio ref={clickSoundRef}>
        <source src="edit.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default EditButton;