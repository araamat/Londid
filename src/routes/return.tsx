import { createFileRoute } from '@tanstack/react-router'

export interface ReturnSearch {
  uid: string;
}

export const Route = createFileRoute('/return')({
  component: () => <ReturnItem />,
  validateSearch: (params: Record<string, unknown>): ReturnSearch => {
    return {
      uid: (params?.uid as string) ?? "",
    };
  },
})

function ReturnItem() {
  return <>
  </>
}
