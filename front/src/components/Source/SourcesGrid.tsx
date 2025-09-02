import Source from "../../models/source.ts";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridEventListener } from "@mui/x-data-grid";

/**
 * SourcesGrid will display all sources using MUI GRID
 *
 * @param {Source[]} sources - Array of source objects to display.
 * @param {Function} onSourceSelection - Callback function to handle source click events.
 *
 */
export default function SourcesGrid({
  sources,
  onSourceSelection,
}: {
  sources: Source[];
  onSourceSelection: (source: Source) => void;
}) {
  const handleRowClick: GridEventListener<"rowClick"> = (
    params: GridRowParams,
  ) => {
      const source: Source | undefined = sources.find((e)=>e.id == params.row.id)
      if (!source) throw new Error("Source not found");

      /*const source : Source = params.row as Source;*/
      onSourceSelection(source);

  };

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const columns: GridColDef<(typeof sources)[number]>[] = [
    { field: "id", headerName: "ID", width: 10 , editable : false},
    { field: "title", headerName: "title", width: 200 , editable : false},
    { field: "description", headerName: "description", width: 300 , editable : false},
    {
      field: "createdAt",
      headerName: "created at",
      width: 200,
      valueFormatter: (date) => new Date(date).toLocaleString("fr-FR", options),
    },
    {
      field: "updatedAt",
      headerName: "updated at",
      width: 200,
      valueFormatter: (date) => new Date(date).toLocaleString("fr-FR", options),
    },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <DataGrid
        rows={sources}
        columns={columns}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 5,
                },
            },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
      />
    </Box>
  );
}
