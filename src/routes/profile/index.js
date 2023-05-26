import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import PhoneInput from "react-phone-number-input";

const Profile = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const usaRegx = /^(\d{3})(\d{3})(\d{4})$/;

  const formater = (phoneNumber) => {
    try {
      if (!phoneNumber) {
        setError(null);
        return null;
      }

      let reg = ("" + phoneNumber).replace(/\D+/g, "").match(usaRegx);
      if (reg) {
        setError(null);
        return "(" + reg[1] + ") " + reg[2] + "-" + reg[3];
      }
      setError("Invalid phone number format.");
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let number = e.target.value;
    setValue(formater(number));
  };

  return (
    <div>
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
          value={value}
          onChange={handleChange}
          class="form-control"
        />
      </p>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Profile;
