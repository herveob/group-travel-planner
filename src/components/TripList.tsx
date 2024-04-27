import { FC } from 'react'
import { FlatList, Pressable, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import { Trip } from '../types/Trip';
import TripCard from './TripCard';

type TripListProps = {
  trips: Trip[];
}

const TripList: FC<TripListProps> = ({ trips }) => {
  const gap = 5;

  const renderItem = ({ id, title, startDate, endDate, members }: Trip) =>
  (
    <SafeAreaView>
      <Pressable
        onPress={() => { }}
        key={id}>
        <TripCard id={id} title={title} startDate={startDate} endDate={endDate} membersCount={members.length} />
      </Pressable>
    </SafeAreaView>
  );

  return (
    <FlatList
      data={trips}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={{
        gap,
        flex: 1,
      }}
    />
  )
}

export default TripList