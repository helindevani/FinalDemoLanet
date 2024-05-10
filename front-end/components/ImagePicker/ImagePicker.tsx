'use client';

import { useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

interface ImagePickerProps {
  label: string;
  name: string;
  onImageChange : any;
}

export default function ImagePicker({ label, name, onImageChange }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>();
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      onImageChange(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.result) {
        setPickedImage(fileReader.result);
        onImageChange(file);
      }
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && typeof pickedImage === 'string' && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              layout="fill"
            />
          )}
        </div>
        <button></button>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Select Your Document
        </button>
      </div>
    </div>
  );
}
