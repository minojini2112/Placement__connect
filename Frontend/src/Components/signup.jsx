import React, {useState} from "react";

const signup = () => {
    const [formData, setformData] = useState({
        username: "",
        email :"",
        password:"",
    });

    const [Message,setMessage] = useState("");
    const handlechamge = e => {
        const {name,value} = e.target;
        setformData({ ...formData, [name]: value })};

};

const handlesubmit = async (e) => {
    e.preventdefault();
    try{
        const response = await fetch("https://localhost:3002/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok){
            const res = await response.json();
            setMessage(res.message || "Signup successfull");
        }
        else{
            const error = await response.json();
            setMessage(error.message || "signUp failed ");
        }

    }catch(err){
        console.error(err);
        setMessage("Error occurred during signup");
    }
};

return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );


export default signup;