import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowParams,
} from "@mui/x-data-grid";
import { CorporaProps } from "../../models/corpus.ts";

const CorporaGrid = ({ corpora, onCorpusSelectSelection }: CorporaProps) => {
  const handleRowClick: GridEventListener<"rowClick"> = (
    params: GridRowParams,
  ) => {
    onCorpusSelectSelection(params.row.id);
  };

  const columns: GridColDef<(typeof corpora)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Date de mise à jour",
      sortable: false,
      width: 160,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={corpora}
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
};

export default CorporaGrid;
