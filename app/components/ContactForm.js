import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        attachments: [] // Per la gestione degli allegati (se li implementerai)
    });
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'attachments' && formData.attachments.length > 0) {
                for (const file of formData.attachments) {
                    formDataToSend.append('attachments', file);
                }
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: formDataToSend, // Invia FormData per gestire i file
            });

            const data = await response.json();
            if (response.ok) {
                setSubmissionStatus(data.message);
                setFormData({ name: '', email: '', subject: '', message: '', attachments: [] }); // Resetta il form
            } else {
                setSubmissionStatus(data.error);
            }
        } catch (error) {
            console.error('Errore:', error);
            setSubmissionStatus('Si è verificato un errore durante l\'invio.');
        }
    };

    return (
        <form id="ContactForm" onSubmit={handleSubmit}>
            {submissionStatus && <p>{submissionStatus}</p>}
            <div>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="subject">Oggetto:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="message">Messaggio:</label>
                <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="attachments">Allegati:</label>
                <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    multiple
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Invia Messaggio</button>
        </form>
    );
};

export default ContactForm;