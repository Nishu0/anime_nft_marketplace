/* eslint-disable */
'use client';

import { useState, useEffect } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        // optional: add client-side validation

        setRequestStatus('pending');

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });
            setRequestStatus('success');
            setEnteredMessage('');
            setEnteredEmail('');
            setEnteredName('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        };
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError,
        };
    }

    return (
        <section className="p-8">
          <h1 className="text-2xl font-bold mb-4">How can I help you?</h1>
          <form className="space-y-4" onSubmit={sendMessageHandler}>
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={(event) => setEnteredEmail(event.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                required
                value={enteredMessage}
                onChange={(event) => setEnteredMessage(event.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>
    
            <div className="flex justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Send Message
              </button>
            </div>
          </form>
          {notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}
        </section>
      );
    }

export default ContactForm;