'use client';  

import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';

function DashboardHeader() {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    email: '',
    eventName: '',
    eventDate: '',
    eventImage: '',
  });

  const [events, setEvents] = useState<{ _id: string; eventName: string; eventDate: string; eventImage: string; name: string; email: string; }[]>([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Event registered:', data.event);
        setEvents((prevEvents) => [...prevEvents, data.event]);
      } else {
        console.error('Error registering event:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white">

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 text-white h-24 w-full bg-black/70 shadow-lg rounded-xl">
        <div className="text-4xl font-extrabold tracking-wide hover:text-blue-400 transition duration-300">
          Event Management
        </div>
        <UserButton />
      </header>

      {/* Event Registration Section */}
      <h2 className="text-4xl font-bold text-center my-10">Event Registration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {/* Event Cards with Gradients */}
        {[
          { title: "Wedding Music Artists", img: "/wedding.jpg", desc: "Mela vaaithiyam, chenda melam for weddings." },
          { title: "Photo & Video Shoot", img: "/Photo & Video Shoot.jpg", desc: "Capture your event's best moments." },
          { title: "Food Supply", img: "/Food Supply.jpg", desc: "Multi-cuisine catering services available." },
          { title: "Invitation Cards", img: "/Invitation Cards.jpg", desc: "Design custom invitation cards." },
          { title: "Stage Decorations", img: "/Stage Decorations.jpg", desc: "Stage decoration with floral & themes." },
          { title: "Vehicle Arrangement", img: "/vehicle.jpg", desc: "Wedding car decoration & transport services." }
        ].map((event, index) => (
          <div key={index} className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
            <img src={event.img} alt={event.title} className="w-full h-48 object-cover rounded-xl" />
            <div className="absolute bottom-0 p-4">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="text-white text-sm">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Form */}
      <div className="flex justify-center items-center mt-12">
        <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-6">Register for an Event</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: "name", type: "text", label: "Full Name", placeholder: "Enter your full name" },
              { id: "email", type: "email", label: "Email Address", placeholder: "Enter your email" },
              { id: "eventName", type: "text", label: "Event Name", placeholder: "Enter the event name" },
              { id: "eventDate", type: "date", label: "Event Date", placeholder: "" },
              { id: "eventImage", type: "url", label: "Event Image URL", placeholder: "Enter event image URL" }
            ].map((input) => (
              <div key={input.id}>
                <label htmlFor={input.id} className="block text-sm font-medium">{input.label}</label>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  value={eventDetails[input.id as keyof typeof eventDetails]}
                  onChange={handleInputChange}
                  className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder={input.placeholder}
                  required
                />
              </div>
            ))}
            <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Register Event
            </button>
          </form>
        </div>
      </div>

      {/* Registered Events */}
      <h2 className="text-4xl font-semibold text-center my-10">Registered Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {events.map((event) => (
          <div key={event._id} className="relative overflow-hidden rounded-xl shadow-lg min-h-[250px] flex flex-col justify-end p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.eventImage})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
            <div className="relative">
              <h3 className="text-white text-xl font-bold">{event.eventName}</h3>
              <p className="text-white text-sm">{new Date(event.eventDate).toLocaleDateString()}</p>
              <p className="text-white text-sm mt-2">{event.name} - {event.email}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default DashboardHeader;
