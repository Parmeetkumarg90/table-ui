import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface InfiniteScrollWrapperProps {
  totalLength: number;
  children: ReactNode;
  hasMore: boolean;
  loading?: boolean;
  fetchMore: () => void;
  height?: number;
  loader?: ReactNode;
}

const InfiniteScrollWrapper = ({
  totalLength,
  children,
  hasMore,
  loading,
  fetchMore,
  height,
  loader,
}: InfiniteScrollWrapperProps) => {
  return (
    <InfiniteScroll
      dataLength={totalLength}
      hasMore={hasMore}
      loader={
        loader ?? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )
      }
      next={fetchMore}
      height={height}
    >
      {children}
    </InfiniteScroll>
  );
};

export { InfiniteScrollWrapper };
