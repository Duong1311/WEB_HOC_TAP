import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setEmailData, setOtpData } from "~/redux/loginSlice";
import { sendEmailOtp } from "~/services/userServices";

export default function EmailInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.loginData.email);

  const handleChange = (e) => {
    dispatch(setEmailData(e.target.value));
  };
  const nagigateToOtp = async () => {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      dispatch(setOtpData(OTP));
      const res = await sendEmailOtp(email, OTP);
      if (res.data.error) {
        return toast.error(res.data.error);
      }
      navigate("/forgot-password/otp");
      return;
    }
    return toast.error("Please enter your email");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-3 rounded-sm shadow-lg w-[500px]">
        <div>Email</div>
        <input
          className="w-full "
          type="email"
          required
          onChange={(e) => handleChange(e)}
        />
        <button className="" onClick={() => nagigateToOtp()}>
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}
