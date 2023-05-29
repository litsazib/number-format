import { h } from "preact";
import { useState } from "preact/hooks";

const Profile = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [formattedNumber, setFormattedNumber] = useState("");
  const usaRegx = /^(\d{3})(\d{3})(\d{4})$/;

  const formater = (phoneNumber) => {
    try {
      if (phoneNumber.length < 14) {
        setError("Invalid phone number format");
      } else {
        setError(null);
      }

      const number = phoneNumber.replace(/\D/g, ""); // Remove non-digit characters
      if (number.length === 0) {
        setFormattedNumber("");
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
        setFormattedNumber(
          `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
        );
        return;
      }
      const reg = number.match(usaRegx);
      if (reg) {
        setError(null);
        return "(" + reg[1] + ") " + reg[2] + "-" + reg[3];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let number = e.target.value;
    formater(number);
  };


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
          maxlength="14"
          value={formattedNumber}
          onInput={handleChange}
          class="form-control"
        />
      </p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default Profile;
