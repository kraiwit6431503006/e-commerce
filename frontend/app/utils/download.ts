export function downloadFile(
  data: object,
  filename: string,
  type: "json" | "txt" = "json"
) {
  const content =
    type === "json"
      ? JSON.stringify(data, null, 2)
      : Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");

  const blob = new Blob([content], {
    type: type === "json" ? "application/json" : "text/plain",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
