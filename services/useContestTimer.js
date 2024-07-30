// useContestTimer.js
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

// Utility function to format time remaining
const formatTimeRemaining = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Hook to manage contest timers
const useContestTimer = (contestDocId) => {
    const [contestStartDate, setContestStartDate] = useState(null);
    const [contestEndDate, setContestEndDate] = useState(null);
    const [phaseTimers, setPhaseTimers] = useState({
        submissionPhase: false,
        votingPhase: false,
        contestEnded: false,
        timeUntilSubmissionEnd: 0,
        timeUntilVotingStart: 0,
        timeUntilContestEnd: 0,
    });
    const [timePhaseCaption, setTimePhaseCaption] = useState('');
    const [timeRemaining, setTimeRemaining] = useState('');

    // Fetch contest dates from Firestore
    useEffect(() => {
        const fetchContestDates = async () => {
            try {
                const contestDoc = await firestore().collection('contests').doc(contestDocId).get();
                if (contestDoc.exists) {
                    const contestData = contestDoc.data();
                    const startDate = contestData.startDate;
                    const endDate = contestData.endDate;
                    if (startDate && endDate) {
                        const startTimestamp = startDate.seconds * 1000 + startDate.nanoseconds / 1000000;
                        const endTimestamp = endDate.seconds * 1000 + endDate.nanoseconds / 1000000;
                        const startDateObject = new Date(startTimestamp);
                        const endDateObject = new Date(endTimestamp);
                        setContestStartDate(startDateObject);
                        setContestEndDate(endDateObject);
                    }
                } else {
                    console.error('Contest document not found');
                }
            } catch (error) {
                console.error('Error fetching contest dates:', error);
            }
        };

        fetchContestDates();
    }, [contestDocId]);

    // Calculate phase timers based on the start and end dates
    useEffect(() => {
        if (!contestStartDate || !contestEndDate) return;

        const calculatePhaseTimers = (startDate, endDate) => {
            const now = new Date();

            const submissionEndDate = new Date(startDate);
            submissionEndDate.setDate(submissionEndDate.getDate() + 5);

            const votingStartDate = new Date(submissionEndDate);
            votingStartDate.setDate(votingStartDate.getDate() + 2);

            const timeUntilSubmissionEnd = submissionEndDate - now;
            const timeUntilVotingStart = votingStartDate - now;
            const timeUntilContestEnd = endDate - now;

            console.log(timeUntilVotingStart)
            const submissionPhase = timeUntilSubmissionEnd > 0;
            const votingPhase = timeUntilSubmissionEnd <= 0 && timeUntilVotingStart > 0;
            const contestEnded = timeUntilVotingStart <= 0 && timeUntilContestEnd <= 0;

            return { submissionPhase, votingPhase, contestEnded, timeUntilSubmissionEnd, timeUntilVotingStart, timeUntilContestEnd };
        };

        const updatePhaseTimers = () => {
            const phases = calculatePhaseTimers(contestStartDate, contestEndDate);
            setPhaseTimers(phases);
        };

        const phaseInterval = setInterval(updatePhaseTimers, 1000);
        updatePhaseTimers();

        return () => clearInterval(phaseInterval);
    }, [contestStartDate, contestEndDate]);

    // Format the time remaining for display
    useEffect(() => {
        if (phaseTimers.submissionPhase) {
            setTimePhaseCaption('Time Left to Submit:');
            setTimeRemaining(`${formatTimeRemaining(phaseTimers.timeUntilSubmissionEnd)}`);
        } else if (phaseTimers.votingPhase) {
            setTimePhaseCaption('Time Left to Vote:');
            setTimeRemaining(`${formatTimeRemaining(phaseTimers.timeUntilVotingStart)}`);
        } else if (phaseTimers.contestEnded) {
            setTimeRemaining('Contest has ended');
        }
    }, [phaseTimers]);

    return {timeRemaining, timePhaseCaption};
};

export default useContestTimer;
