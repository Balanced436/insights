import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import CorpusType, { CorporaProps } from "../../models/corpus";

const CorporaGrid = ({ corpora, onCorpusSelect }: CorporaProps) => {
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    onCorpusSelect(params.row.id);
  };

  const columns: GridColDef<(typeof corpora)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      type: "number",
      width: 110,
      editable: true,
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
