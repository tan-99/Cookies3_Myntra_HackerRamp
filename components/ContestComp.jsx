import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useContestTimer from '../services/useContestTimer';

const ContestComp = ({ contestDocId, size }) => {
    const { timeRemaining, timePhaseCaption } = useContestTimer(contestDocId);

    // Memoize the rendered output to avoid unnecessary re-renders
    const timerDisplay = useMemo(() => (
        <View style={size === 'large' ? styles.largeContainer : styles.smallContainer}>
            <Text style={size === 'large' ? styles.largePhaseText : styles.smallPhaseText}>{timePhaseCaption}</Text>
            <Text style={size === 'large' ? styles.largeTimeText : styles.smallTimeText}>{timeRemaining}</Text>
        </View>
    ), [timeRemaining, size]);

    return (
        <View style={styles.container}>
            {timerDisplay}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    largePhaseText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5
    },
    smallPhaseText: {
        fontSize: 12,
        fontWeight: '500',
        marginRight: 5
    },
    largeTimeText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#D81B60'
    },
    smallTimeText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#D81B60'
    }
});

export default ContestComp;
