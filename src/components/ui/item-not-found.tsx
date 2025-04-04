export const ItemNotFound = ({ item }: { item: string }) => {
  return (
    <div className="text-muted-foreground text-sm p-2 m-4 rounded-full bg-gray-100 text-center">
      {item} not found.
    </div>
  );
};
