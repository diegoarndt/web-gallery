# AKK Web Gallery

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

AKK Web Gallery is a platform where photography enthusiasts can share their favorite pictures with a like-minded community. Developed using React and Firebase, the gallery provides a seamless experience for users to upload, view, and interact with images.

**Feel free to share your favorite pictures with like-minded photography enthusiasts.**

![AKK Web Gallery Screenshot](./public/screenshot.png)

## Features

- Upload and share your favorite images
- View high-quality images in a grid layout
- Responsive design for optimal viewing on any device
- Authentication for user accounts
- Image deletion functionality

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (latest LTS version)
- [Git](https://git-scm.com/downloads)

### Installation

1. Clone the repository:

<pre>
git clone https://github.com/yourusername/akk-web-gallery.git
</pre>

2. Install the dependencies:

<pre>
cd akk-web-gallery
npm install
</pre>

3. Create a `.env` file in the root folder of the project, and add your Firebase configuration:

<pre>
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
</pre>

4. Run the development server:

<pre>
npm start
</pre>

5. Open your browser and navigate to `http://localhost:3000`. The app should now be running.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Create React App](https://github.com/facebook/create-react-app)
