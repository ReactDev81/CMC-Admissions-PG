const Title = ({ title, id, classname }) => {
    return (
      <h2 id={id} className={`text-black-default ${classname}`}>
        {title}
      </h2>
    );
  };
  
  export default Title;