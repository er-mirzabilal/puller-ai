import { setSubmitValidateLoading } from "@/libs/redux/features/globalLoadings";
import { useAppDispatch } from "@/libs/redux/hooks";
import { getBackendURL } from "@/utils/common";
import { Prompt, submitValidatePayload } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useSubmitValidate = () => {
  const dispatch = useAppDispatch();
  // const route = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );
  async function submit(data: submitValidatePayload): Promise<Prompt | null> {
    try {
      const backendUrl = getBackendURL(process.env.NEXT_PUBLIC_MODE as string);
      const res = await axios({
        url: `${backendUrl}/v0/query/validate`,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  }
  return useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      // dispatch(UpdateIsLoadingRequest(false));
      // route.replace("/request")
      // if (data) {
      //   const pathname = "/request";
      //   route.replace(pathname + "?" + createQueryString("id", data?.id as string));
      // }

      setTimeout(() => {
        dispatch(setSubmitValidateLoading(false));
      }, 500);
      toast.success("Variables updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? (error.message as string));
      console.log(error, "error in validating request");
    },
  });
};

// import { UpdateIsLoadingRequest } from "@/libs/redux/features/isLoadingRequest";
// import { useAppDispatch } from "@/libs/redux/hooks";
// import { Prompt, submitValidatePayload } from "@/utils/types";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const useSubmitValidate = (
//   handleConsoleMessages: (message: string) => void
// ) => {
//   const dispatch = useAppDispatch();

//   async function submit(data: submitValidatePayload): Promise<Prompt | null> {
//     try {
//       const res = await axios({
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v0/query/validate`,
//         method: "POST",
//         data,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (res.status === 200) {
//         return res.data;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       return null;
//     }
//   }

//   const { mutate, ...mutationProps } = useMutation({
//     mutationFn: submit,
//     onSuccess: (data) => {
//       dispatch(UpdateIsLoadingRequest(false));
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message ?? (error.message as string));
//       console.log(error, "error in validating request");
//     },
//   });

//   // Timeout logic
//   let timeoutId: NodeJS.Timeout | null = null;
//   const handleTimeout = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//       timeoutId = null;
//     }
//     handleConsoleMessages("Generating SQL");
//     timeoutId = setTimeout(() => {
//       handleConsoleMessages("Preparing Graph");
//       timeoutId = setTimeout(() => {
//         handleConsoleMessages("Finalizing");
//         timeoutId = null;
//       }, 1000); // Finalizing after 2 seconds of preparing graph
//     }, 1000); // Preparing graph after 2 seconds of generating SQL
//   };

//   const customMutate = async (...args: Parameters<typeof mutate>) => {
//     handleTimeout();
//     await mutate(...args);
//   };

//   return { customMutate, ...mutationProps };
// };
