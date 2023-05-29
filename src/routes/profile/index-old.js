import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const Profile = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [formattedNumber, setFormattedNumber] = useState('');

  const usaRegx = /^(\d{3})(\d{3})(\d{4})$/;

  const formater = (phoneNumber) => {
    try {
      const number = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
      if (number.length === 0) {
        setFormattedNumber('');
        setError(null);
        return;
      }
      if (number.length <= 3) {
        setFormattedNumber(`(${number}`);
        return;
      }
      if (number.length <= 6) {
        setFormattedNumber(`(${number.slice(0, 3)}) ${number.slice(3)}`);
        return;
      }
      if (number.length <= 10) {
        setFormattedNumber(`(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`);
        return;
      }
  
      const reg = number.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (reg) {
        setError(null);
        setFormattedNumber(`(${reg[1]}) ${reg[2]}-${reg[3]}`);
      } else {
        setFormattedNumber(null);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) => {
    let number = e.target.value;
    formater(number);
    setValue(number)
  };

  // const handleKeyDown = (e) => {
  //   // Check if the pressed key is a number
  //   if (/^[0-9]$/.test(e.key)) {
  //     console.log(e.key)
  //     let number = e.key;
  //     setValue(number);
  //     formater(number);
  //   }
  // };

  return (
    <div>
      <h1>USA PHONE FNumber {formattedNumber}</h1>
      <h1>USA PHONE NUMBER {value}</h1>
      <p>
        <input
          type="tel"
          title="USA based Phone Number in the format of: (123) 456-7890"
          placeholder="(xxx) xxx-xxxx"
          required={true}
          name="Mobilenumber"
          pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
          maxLength="14"
          value={formattedNumber}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
          className="form-control"
        />
      </p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Profile;







