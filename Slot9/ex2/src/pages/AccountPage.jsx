import { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AboutForm from "../components/account/AboutForm";
import AccountForm from "../components/account/AccountForm";
import AddressForm from "../components/account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState(false);

  const [values, setValues] = useState({
    // About
    firstName: "", lastName: "", email: "", phone: "", age: "", avatar: "",
    // Account
    username: "", password: "", confirm: "", question: "", answer: "",
    // Address
    street: "", city: "", country: "", zip: ""
  });

  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setValues(v => ({ ...v, [name]: files ? files[0]?.name || "" : value }));
  };

  const requiredOkStep1 = values.firstName && values.lastName && values.email && values.phone && values.age && values.avatar;
  const requiredOkStep2 = values.username && values.password && values.confirm && values.question && values.answer && (values.password === values.confirm);
  const requiredOkStep3 = values.street && values.city && values.country && values.zip;

  const next = () => {
    setTouched(true);
    if (step === 1 && !requiredOkStep1) return;
    if (step === 2 && !requiredOkStep2) return;
    setTouched(false);
    setStep(s => Math.min(3, s + 1));
  };

  const prev = () => {
    setTouched(false);
    setStep(s => Math.max(1, s - 1));
  };

  const finish = () => {
    setTouched(true);
    if (!requiredOkStep3) return;
    alert("✅ Profile built successfully!");
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Build Your Profile</h3>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />

      <Card className="p-3">
        {step === 1 && <AboutForm values={values} onChange={onChange} touched={touched} />}
        {step === 2 && <AccountForm values={values} onChange={onChange} touched={touched} />}
        {step === 3 && <AddressForm values={values} onChange={onChange} touched={touched} />}

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prev} disabled={step === 1}>Previous</Button>
          {step < 3 ? (
            <Button variant="primary" onClick={next}>Next</Button>
          ) : (
            <Button variant="success" onClick={finish}>Finish</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
