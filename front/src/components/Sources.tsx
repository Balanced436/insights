import Source from "../models/source";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridEventListener } from "@mui/x-data-grid";

/**
 * Component for displaying and managing sources.
 *
 * @param {Source[]} props.sources - Array of source objects to display.
 * @param {Function} props.onSourceClick - Callback function to handle source click events.
 *
 */
export default function Sources({
  sources,
  onSourceSelection,
}: {
  sources: Source[];
  onSourceSelection: (sourceid: number) => void;
}) {
  const handleRowClick: GridEventListener<"rowClick"> = (
    params: GridRowParams,
  ) => {
    onSourceSelection(params.row.id);
  };

  const columns: GridColDef<(typeof sources)[number]>[] = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "title", headerName: "title", flex: 1 },
    { field: "description", headerName: "description", flex: 1 },
    { field: "videoUrl", headerName: "video url", flex: 1 },
    { field: "audioUrl", headerName: "audio url", flex: 1 },
    { field: "createdAt", headerName: "created at", flex: 1 },
    { field: "updatedAt", headerName: "created at", flex: 1 },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <DataGrid
        rows={sources}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
      />
    </Box>
  );
}
