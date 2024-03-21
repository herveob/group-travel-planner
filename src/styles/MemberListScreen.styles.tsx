import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    memberListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,
    },
    button: {
        borderRadius: 12,
        padding: 10,
        elevation: 2,
        height: 50,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
        marginTop: 10,
        marginBottom: 10,
        height: 50,
    },
});
