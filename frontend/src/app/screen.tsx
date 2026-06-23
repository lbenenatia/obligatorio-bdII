import { ScrollView } from 'react-native';

export default function Screen({
  children,
  backgroundColor = '#fff',
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) {
  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 50,
        backgroundColor,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}