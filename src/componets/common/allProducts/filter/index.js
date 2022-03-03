import React, { useEffect, useState } from "react";
import { Checkbox, IconButton } from "@material-ui/core";

import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Axios from "../../../../api/axios";
import { filter } from "../../../../api/constants";

import FilterImg1 from "../../../../assets/allProduct/1.png";
import FilterImg2 from "../../../../assets/allProduct/2.png";
import FilterImg3 from "../../../../assets/allProduct/3.png";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  filterCss: {
    width: 300,
    padding: 20,
  },
  text: {
    marginLeft: theme.spacing(3),
    marginRight: 20,
    fontSize: 22,
    marginTop: 5,
  },
  flex: {
    display: "flex",
    marginTop: 10,
  },

  body: {
    minHeight: "55vh",
  },
  paper: {
    padding: theme.spacing(1),
    width: "300vw",
  },
  filtegroupdiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  filterName: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    cursor: "pointer",
  },
}));

function FilterComponent({ filterSelect, filterGroupExpand, selectedFilters }) {
  let fltrs = [...selectedFilters];
  const classes = useStyles();
  const all_filter_API = `${filter.getAllFilterGroup}`;
  const [filterGroupList, setFilterGroupList] = useState(true);
  // const [loading, setLoading] = useState();
  const [filterSpand, setFilterSpand] = useState(false);
  const [filterList, setFilterList] = useState();
  const [selectedfilterGrpId, setSelectedfilterGrpId] = useState();
  const filterImages = [FilterImg1, FilterImg2, FilterImg3];
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [selectedFilterName, setSelectedFilterName] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await Axios.get(all_filter_API).then((res) => {
          if (res.data.length > 0) {
            setFilterGroupList(res.data);
          } else {
            setFilterGroupList([]);
          }
        });
      } catch (e) {
        //console.log(e);
      }
    };

    fetchPosts();
  }, [all_filter_API]);

  const groupSelect = (id, name) => {
    filterGroupExpand();
    setSelectedFilterName(name);
    setFilterPopupOpen(true);
    if (id === selectedfilterGrpId) {
      setFilterSpand(!filterSpand);
    } else {
      setSelectedfilterGrpId(id);
      setFilterSpand(true);
      setFilterList("");
      Axios.get(`${filter.getAllActiceFilterbyGroupId}/` + id).then((res) => {
        setFilterList(res.data);
      });
      setFilterPopupOpen(true);
    }
  };

  function handleclose() {
    setFilterPopupOpen(false);
  }

  return (
    <div className="">
      {filterGroupList && filterGroupList.length
        ? filterGroupList.map((filter, index) => {
            return (
              <div
                className=" filter-container p-2"
                style={{
                  backgroundImage: `url(${filterImages[index]})`,
                }}
              >
                <div
                  className=" filter-dropdown row flex-nowrap align-items-center align-self-center"
                  onClick={() => groupSelect(filter._id, filter.name)}
                >
                  <div className="mt-n15 filter-text">{filter.name}</div>
                  <IconButton
                    style={{ color: "white" }}
                    onClick={() => groupSelect(filter._id, filter.name)}
                  >
                    {filterSpand ? (
                      selectedfilterGrpId === filter._id ? (
                        <ExpandLessIcon fontSize="inherit" />
                      ) : (
                        <ExpandMoreIcon fontSize="inherit" />
                      )
                    ) : (
                      <ExpandMoreIcon fontSize="inherit" />
                    )}
                  </IconButton>
                </div>

                {/* <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={filterPopupOpen}
                  onClose={handleclose}
                >
                  <DialogTitle className="bg-accent text-white">
                    {filter.name}
                  </DialogTitle>
                  <DialogContent>
                    <div className="pt-3 row" style={{ minWidth: "250px" }}>
                      {filterList && filterList.length
                        ? filterList.map((data) => (
                            <div>
                              <Button
                                className="m-2"
                                variant="outlined"
                                // color="primary"
                                style={{
                                  backgroundColor:
                                    fltrs.indexOf(data._id) !== -1
                                      ? "rgba(191,150,10,1)"
                                      : null,
                                  color:
                                    fltrs.indexOf(data._id) !== -1
                                      ? "white"
                                      : "rgba(191,150,10,1)",
                                }}
                                onClick={() =>
                                  filterSelect(data._id, filter._id)
                                }
                              >
                                {data.name}
                              </Button>
                            </div>
                          ))
                        : null}
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "#000", color: "#fff" }}
                    >
                      Apply
                    </Button>
                  </DialogActions>
                </Dialog> */}

                {/* {filterSpand ? (
                <div className="col">
                  {selectedfilterGrpId === filter._id
                    ? filterList && filterList.length
                      ? filterList.map((data) => (
                          <div>
                            <Checkbox
                              value={data._id}
                              onChange={() =>
                                filterSelect(data._id, filter._id)
                              }
                              style={{
                                color: "#ff9100",
                              }}
                            />
                            <Typography variant="h6" component="h2">
                              {data.name}
                            </Typography>
                          </div>
                        ))
                      : null
                    : null}
                </div>
              ) : null
              } */}
              </div>
            );
          })
        : null}
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={filterPopupOpen}
        onClose={handleclose}
      >
        <DialogTitle className="bg-accent text-white">
          {/* {filter.name} */}
          {selectedFilterName}
        </DialogTitle>
        <DialogContent>
          <div className="pt-3 row" style={{ minWidth: "250px" }}>
            {filterList && filterList.length
              ? filterList.map((data) => (
                  <div>
                    <Button
                      className="m-2"
                      variant="outlined"
                      // color="primary"
                      style={{
                        backgroundColor:
                          fltrs.indexOf(data._id) !== -1
                            ? "rgba(191,150,10,1)"
                            : null,
                        color:
                          fltrs.indexOf(data._id) !== -1
                            ? "white"
                            : "rgba(191,150,10,1)",
                      }}
                      onClick={() => filterSelect(data._id, filter._id)}
                    >
                      {data.name}
                    </Button>
                  </div>
                ))
              : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#000", color: "#fff" }}
            onClick={handleclose}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterComponent;
