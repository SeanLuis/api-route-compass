
// This is a re-export of your existing toast hook
// We're just creating this file to satisfy the import in the components/ui/use-toast.ts file
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;
