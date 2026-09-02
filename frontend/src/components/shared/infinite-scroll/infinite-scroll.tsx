import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./styles.module.css";

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
        loading
          ? (loader ?? (
              <Box className={styles.loader}>
                <CircularProgress size={24} />
              </Box>
            ))
          : undefined
      }
      next={fetchMore}
      height={height}
    >
      {children}
    </InfiniteScroll>
  );
};

export { InfiniteScrollWrapper };
