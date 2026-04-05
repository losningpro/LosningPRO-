type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

export default function handler(_req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json({
    ok: true,
    ts: new Date().toISOString(),
  });
}
