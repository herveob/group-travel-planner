import React, { useCallback, FC, Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

export type Range = {
  startDate: Date | undefined,
  endDate: Date | undefined,
};

type DateRangePickerProps = {
  range: Range,
  setRange: Dispatch<SetStateAction<Range>>,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
};

const DateRangePicker: FC<DateRangePickerProps> = ({ range, setRange, open, setOpen }) => {
  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: { startDate: Date | undefined, endDate: Date | undefined }) => {
      setOpen(false);
      if (startDate && endDate) {
        setRange({ startDate, endDate });
      }
    },
    [setOpen, setRange]
  );

  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" icon={'calendar'}>
          {'Pick your date range'}
        </Button>
        <DatePickerModal
          disableStatusBarPadding
          locale="fr"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
          startYear={2023}
          endYear={2024}
        />
      </View>
    </SafeAreaProvider>
  );
}

export default DateRangePicker;