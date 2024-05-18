import React, { useState } from 'react'
import { Alert, Button, Label, TextInput, Textarea } from 'flowbite-react'

const ContactUs = () => {

  const [alert, setAlert] = useState(null)

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", `${import.meta.env.VITE_FORM_ACCESS_KEY}`);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      // console.log("Success", res);
      setAlert(res.message)
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="left flex-1 text-center">
          <h1 className='text-5xl font-semibold text-purple-500'>Contact Us</h1>
          <p className="text-sm mt-2 font-medium">
            We love to know your feedback.
          </p>
        </div>
        <div className="right flex-1 mt-7 md:mt-0">
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div>
              <Label value="Your Name" />
              <TextInput
                className="mt-2"
                type="text"
                placeholder='name...'
                name="name"
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                className="mt-2"
                type="email"
                placeholder="name@company.com"
                name="email"
              />
            </div>
            <div>
              <Label value="Message" />
              <Textarea
                className="mt-2 resize-none"
                placeholder="write your message"
                name="message"
                rows='4'
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              outline
            >
              Submit Form
            </Button>
          </form>
          {
            alert && <Alert color='success' className='mt-5'>
              {alert}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default ContactUs