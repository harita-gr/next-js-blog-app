const DarkTheme = () => {
  return (
    <style jsx global>
      {`
        /* Dark Theme */
        :root {
          --background-color: black;
          --link-color: rgb(226, 177, 13);
          --text-color: rgba(255, 255, 255, 0.911);
        }
      `}
    </style>
  );
};

export default DarkTheme;
