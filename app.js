import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: "xxxxx",
  authDomain: "idnity-d8121.firebaseapp.com",
  projectId: "idnity-d8121",
  storageBucket: "idnity-d8121.firebasestorage.app",
  messagingSenderId: "433960340893",
  appId: "1:433960340893:web:b84cb9d98db5cec117f374",
  measurementId: "G-FFW4KWF3S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Reference to the 'pathways' collection in Firestore
const pathwaysRef = db.collection('pathways');

// Artistic Development pathway
await pathwaysRef.doc('artistic_development').set({
  name: 'Artistic Development',
  description: 'Pathway for creative and artistic growth.',
  interests: [
    'Painting',
    'Sculpture',
    'Photography',
    'Graphic Design',
    'Fashion Design',
    'Theater',
    'Music Composition',
    'Dance',
    'Writing'
  ]
});

// Career Development pathway
await pathwaysRef.doc('career_development').set({
  name: 'Career Development',
  description: 'Pathway for professional growth and career advancement.',
  interests: [
    'Public Speaking',
    'Leadership',
    'Networking',
    'Time Management',
    'Entrepreneurship',
    'Project Management',
    'Marketing',
    'Negotiation Skills'
  ]
});

// Personal Development pathway
await pathwaysRef.doc('personal_development').set({
  name: 'Personal Development',
  description: 'Pathway for self-improvement and personal growth.',
  interests: [
    'Mindfulness',
    'Meditation',
    'Self-Discipline',
    'Fitness',
    'Nutrition',
    'Reading',
    'Journaling',
    'Volunteer Work',
    'Traveling'
  ]
});
