import { z } from "zod";

export const uploadSchema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: "Selecione um arquivo",
    })
    .refine(
      (files) =>
        files?.[0]?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Apenas arquivos .xlsx são aceitos",
      }
    ),
});

export type UploadFormData = z.infer<typeof uploadSchema>;
