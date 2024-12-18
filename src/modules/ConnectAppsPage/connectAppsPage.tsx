"use client";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ConnectCard } from "@/components/ConnectCard";
import { Input } from "@/components/Input";
import { palette } from "@/theme/Palette";
import { AlertModal } from "@/modals/AlertModal";
import { useEffect, useState } from "react";
import { isDemoMode, isPilotMode } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getConnectQuery,
  updateConnectQuery,
} from "@/libs/redux/features/searchbar";
import { useGetAllApps, useUpdateAppStatus } from "@/hooks/useRetriever";
import { Loader } from "@/components/Loader";
import { ConnectItem } from "@/utils/types";
import { ChangeNameModal } from "@/modals/changeNameModal";
import { useGetClientInfo } from "@/hooks/useMeta";

const ConnectAppsPage = () => {
  const query = useAppSelector(getConnectQuery);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenEditName, setIsOpenEditName] = useState(false);
  const [SelectedCardData, setSelectedCardData] = useState<ConnectItem | null>(
    null
  );
  const [data, setData] = useState<ConnectItem[] | null | undefined>(null);

  const {
    data: connectApps,
    refetch: connectAppRefetch,
    isFetching: loadingApps,
    isSuccess: isSuccessApps,
  } = useGetAllApps();
  const {
    data: appStatusData,
    mutate: updateAppStatus,
    isSuccess: appStatusUpdated,
    isLoading: loadingAppUpdate,
  } = useUpdateAppStatus();
  const {
    data: MetaData,
    refetch: refetchClient,
    isFetching: isLoadingClient,
  } = useGetClientInfo();

  const handleCreateRetriever = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      router.push("/retrievers/upload");
    }
  };

  const handleCardConnect = (item: ConnectItem) => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      setSelectedCardData(item);
      updateAppStatus({ id: item.id, status: !item.isConnected });
    }
  };
  const handleNameClick = (item: ConnectItem) => {
    setIsOpenEditName(true);
    setSelectedCardData(item);
  };

  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase().includes(query.toLowerCase())
  );
  const clientData = {
    id: MetaData?.connection?.type as string,
    image: "/Images/blank-square.svg" as string,
    isConnected: true,
    name: MetaData?.connection?.schema as string,
  };
  useEffect(() => {
    if (appStatusUpdated && appStatusData) {
      if (isPilotMode) {
        setData([clientData, ...appStatusData]);
      } else {
        setData(appStatusData);
      }
      setIsLoading(false);
    }
  }, [appStatusUpdated, appStatusData]);

  useEffect(() => {
    if (isSuccessApps && connectApps) {
      if (isPilotMode) {
        setData([clientData, ...connectApps]);
      } else {
        setData(connectApps);
      }
      setIsLoading(false);
    }
  }, [isSuccessApps, connectApps, MetaData]);

  useEffect(() => {
    if (isPilotMode) {
      refetchClient();
    }
  }, [refetchClient]);
  useEffect(() => {
    if (projectId && orgId && isPilotMode) {
      connectAppRefetch();
    } else if (isDemoMode) {
      connectAppRefetch();
    }
  }, [projectId, orgId, connectAppRefetch]);
  console.log(isLoading, loadingApps, isLoadingClient, "filteredData");
  return (
    <Box
      sx={{
        padding: "1.2rem 1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <PageHeader title="Connect App" />

      <Paper
        variant="light-border"
        sx={{
          height: "calc(100vh - 210px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            background: palette.linearGradient.gray,
            borderTopRightRadius: "14px",
            height: "5rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Search..."
            icon="search"
            width={409}
            height={44}
            value={query}
            onChange={(e) => dispatch(updateConnectQuery(e.target.value))}
          />
          <Button
            variant="contained"
            sx={{
              width: "220px",
              height: "44",
            }}
            label="Create Retriever"
            onClick={handleCreateRetriever}
          />
        </Box>

        <Box
          sx={{
            height: "90%",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {isLoading || loadingApps || isLoadingClient ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader
                type="Loading"
                variant="simple"
                isLoading={loadingApps || isLoadingClient || isLoading}
              />
            </Box>
          ) : filteredData && filteredData.length <= 0 ? (
            <Typography
              variant="text-lg-bold"
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                color: palette.opacity.lightGray,
                display: "flex",
                alignItems: "center",
              }}
            >
              No Connect Apps
            </Typography>
          ) : (
            filteredData?.map((item, index) => (
              <ConnectCard
                key={index}
                item={item}
                disabled
                onNameClick={() => handleNameClick(item)}
                isLoading={
                  ((SelectedCardData &&
                    SelectedCardData.id === item.id) as boolean) &&
                  loadingAppUpdate
                }
                onClick={() => handleCardConnect(item)}
              />
            ))
          )}
        </Box>
      </Paper>
      <ChangeNameModal
        setData={setData}
        // refetch={connectAppRefetch}
        SelectedData={SelectedCardData as ConnectItem}
        open={isOpenEditName}
        handleClose={() => setIsOpenEditName(false)}
      />
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default ConnectAppsPage;
