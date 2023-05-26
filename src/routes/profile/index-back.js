import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import PhoneInput from "react-phone-number-input";

const Profile = () => {
  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');
  const [error, setError] = useState(null);
  const usaRegx = /^(\d{3})(\d{3})(\d{4})$/;

  const formatPhoneNumber = (inputNumber) => {
    const usaRegx = /^(\d{3})(\d{3})(\d{4})$/;
    const number = inputNumber.replace(/\D/g, ''); // Remove non-digit characters

    if (number.length === 0) {
      setFormattedNumber('');
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

    if (number.length <= 14) {
      setFormattedNumber(`(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`);
      return;
    }

    const reg = number.match(usaRegx);
    if (reg) {
      setFormattedNumber(`(${reg[1]}) ${reg[2]}-${reg[3]}`);
    } else {
      setFormattedNumber(inputNumber); // If unable to match format, display the input as is
    }
  };

  const handleChange = (e) => {
    const inputNumber = e.target.value;
    setPhoneNumber(inputNumber);
    formatPhoneNumber(inputNumber);
  };

  return (
    <div>
      <h1>USA PHONE NUMBER {formattedNumber}</h1>
      <p>
        <input
          type="tel"
          title="USA based Phone Number in the format of: (123) 456-7890"
          placeholder="(xxx) xxx-xxxx"
          required={true}
          name="Mobilenumber"
          pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
          maxlength="14"
          value={phoneNumber}
          onChange={handleChange}
          class="form-control"
        />
      </p>
      {/* {error && <p>Error: {error}</p>} */}
    </div>
  );
};

export default Profile;
