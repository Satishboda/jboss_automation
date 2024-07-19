
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  SpaceBetween,
  Checkbox,
  TextFilter,
  Header,
  Pagination,
  CollectionPreferences,
  Alert
} from "@cloudscape-design/components";

// import "../../assets/css/groups/groupdetail.css";
import { Link, useParams } from "react-router-dom";
import Box from "@cloudscape-design/components/box";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
// import UserMultiselect from "./UserMultiselect";
import Multiselect from "@cloudscape-design/components/multiselect";
import BaseApi from "../../../BaseApi";

const GroupDetails = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [toast, setToast] = useState({ visible: false, type: "", message: "" });
  const [value,setValue]=useState(0)
  const[groupName,setGroupName]=useState("")
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    fetchData();
    getGroupDetails(id);
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, type: "", message: "" });
      }, 2000);
      return () => clearTimeout(timer);
    }
    console.log("selected options",selectedOptions)
  }, [id,value,toast,selectedOptions]);
  const getGroupDetails = async (id) => {
    try {
      const response = await BaseApi.get(`group-details/${id}`);
      console.log(response)
      setGroupName(response.data.name);
    } catch (error) {
      console.log("Error fetching in group details");
    }
  };

  const fetchData = async () => {
    try {
      const membersResponse = await fetchGroupMembers(id);
      setMembers(membersResponse);
      const usersResponse = await fetchUsers();
      const filteredUsers = usersResponse.filter(
        (user) => !membersResponse.some((member) => member.id === user.id)
      );
      setUsers(filteredUsers);
    } catch (error) {
      setError(error);
      console.error("Error fetching group members:", error);
    }
  };

  const fetchUsers = async () => {
    const response = await BaseApi.get("/users");
    return response.data;
  };

  const fetchGroupMembers = async (id) => {
    const response = await BaseApi.get(`/group-members/${id}`);
    return response.data;
  };

  const handleAddMembers = async () => {
    try {
      const newMembers = [];

      for (const member of selectedOptions) {
        const response = await axios.post(
          "http://192.168.1.69:8000/allocate-group",
          null,
          {
            params: {
              user_id: member.value,
              id: id,
            },
            headers:{
              'access-token' :  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2Z2xJampxQU5xQ2x5VmhnUk5BMDhHTUYwLVczQzQ2V0Iwa0hnaVFpSkR3In0.eyJleHAiOjE3MjEzNzk2NDEsImlhdCI6MTcyMTM3MjQ0MSwianRpIjoiMjVmMTg4MzQtMmExNy00ODk5LWIwZTQtNGFlYjRlYTg3Nzk3IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS4xMTA6ODA4MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiZjc2NmQyNDgtM2Q1NS00ZmY1LWI3MGMtZWE2MTkyY2Q4OTk4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2lkIjoiMjEzMjk3OTAtZGFiNS00ZDYxLWI2MWMtYTg3YjFkM2MwNzNiIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjcmVhdGUtcmVhbG0iLCJkZWZhdWx0LXJvbGVzLW1hc3RlciIsImpib3NzLWFkbWluIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsImpib3NzLXZpZXdlciIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.iAsUfCtI6a85smjEGO0b8trwr3VIggBMmiP-2gMwwULxdjdMCUOl1ywIOXdLceYArf7h2C_WO0Oc-cyTpLlLGOfB9yqjmvqygrPH4OvEq2tx44ffg9nRUxo5F0-mTOnNY9AlOxB_XLuks47vmeF-8Ecf6vmv78_JzerB5SWBIaByqFcd52L4aLF668nrfmMElkSav8KP_2Zj_ynWQdD4qTs776ieCQ03UebCZb82MQRcI0SsEgAiBafYJgINtFayFbYDcciiNBNIJn9OvqG7qAmc2WlD_Sg2sDTafV4PNklW-L0_0Nc-OAT2g3D_EOdZmw6gakgWeQ1Ykz5EGpdC4w"
            }
          }
        );
        console.log(`Added member ${member}, response:`, response.data);
        const addedUser = users.find((user) => user.id === member.id);
        if (addedUser) {
          newMembers.push(addedUser);
        }

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== member.id)
        );
      }

      setMembers((prevMembers) => [...prevMembers, ...newMembers]);
      // setIsCreateModalOpen(false);
      console.log("random")
      
      setValue(value+1)
      setToast({ visible: true, type: "success", message: ` ${selectedOptions.length} users allocated to the group successfully!` });
      setSelectedOptions([])
    } catch (error) {
      console.error("Error adding members:", error);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      (member.username &&
        member.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.firstName &&
        member.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.lastName &&
        member.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.email &&
        member.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pageSize = 6;
  const totalPages = Math.ceil(filteredMembers.length / pageSize);

  const currentPageUsers = filteredMembers.slice(
    (currentPageIndex - 1) * pageSize,
    currentPageIndex * pageSize
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.detail.filteringText);
    setCurrentPageIndex(1);
  };

  

  const handleDeleteMember = async (deleteMember) => {
    try {
      await BaseApi.delete("/deallocate-group", {
        params: {
          user_id: deleteMember.id,
          id: id,
        },
      });
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== deleteMember.id)
      );
      setIsDeleteModalOpen(false);
      setToast({ visible: true, type: "success", message: ` ${deleteMember.username} is deallocated from the group!` });
      setValue(value+1)
      setDeleteMember(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleDeleteMultipleMembers = async () => {
    console.log("items",selectedItems)
    
    try {
      for (const user of selectedItems) {
        const response=await BaseApi.delete("/deallocate-group", {
          params: {
            user_id: user.id,
            id: id,
          },
        });
        console.log(response)
      }
      setMembers((prevMembers) =>
        prevMembers.filter((member) => !selectedItems.includes(member.id))
      );
      setShowDeleteConfirmation(false);
     
      setToast({ visible: true, type: "success", message: "Members deallocated from the group successfully!" });
      setValue(value + 1);
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting users:", error);
      setToast({ visible: true, type: "error", message: "Error deallocating members!" });
    }
  };
  const options = users.map((user) => ({
    label: user.username,
    value: user.id,
    
  }));
  
  
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  const handleDeleteMultipleMembersClick=()=>{
    setShowDeleteConfirmation(true)
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (action,member) => {
    setDeleteMember(member)
    setIsDeleteModalOpen(true)
    handleMenuClose();

  };
  const handleMenuOpen = (event, member) => {
    setAnchorEl(event.currentTarget);
    setDeleteMember(member);
  };
  const renderAction = (member) => (
    <div>
      <IconButton onClick={(event) => handleMenuOpen( event,member)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && deleteMember === member}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("delete",member)}>Delete</MenuItem>
      </Menu>
    </div>
  );
  const dismissToast = () => setToast({ visible: false, type: "", message: "" });
  const handleMultiSelect=({detail})=>{
    
    setSelectedOptions(detail.selectedOptions);
   
   
  }

 

  return (
    <div className="table-container">
     {toast.visible && (
        <Alert
          visible={toast.visible}
          type={toast.type}
          dismissible
          onDismiss={dismissToast}
          header={toast.type === "success" ? "Success" : "Error"}
        >
          {toast.message}
        </Alert>
      )}
      <div className="header">
       
      </div>

      {/* {error && <p>Error: {error.message}</p>} */}
      <Table
        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => item.username,
        }}
        columnDefinitions={[
          {
            id: "username",
            header: "UserName",
            cell: (item) => item.username,
          },
          {
            id: "firstname",
            header: "FirstName",
            cell: (item) => item.firstName,
          },
          {
            id: "lastname",
            header: "LastName",
            cell: (item) => item.lastName,
          },
          {
            id: "email",
            header: "Email",
            cell: (item) => item.email,
          },
          {
            id:"actions",
            header:"Action",
            cell:(item)=>renderAction(item),
            visible:true,

          },
        ]}
        enableKeyboardNavigation
        items={currentPageUsers}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="id"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>Search Results not Found !!!</b>
            </SpaceBetween>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="search members here"
            onChange={handleSearchChange}
            filteringText={searchQuery}
          />
        }
        header={
         
          <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/groups">
            <h5 style={{ margin: 0,fontSize:"16px" }}>{groupName}</h5>
          </Link>
          <span style={{ marginLeft: "0.5rem",fontSize:"18px" }}>Members</span>
          <span style={{ marginLeft: "0.5rem" ,fontSize:"18px"}}>
            {selectedItems.length
              ? `(${selectedItems.length}/${selectedItems.length})`
              : `(${selectedItems.length})`}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {selectedItems.length > 0 && (
            <span style={{ minWidth: "130px" }}>
              <Button variant="primary" onClick={handleDeleteMultipleMembersClick}>Delete</Button>
            </span>
          )}
          {/* <Multiselect
      selectedOptions={selectedOptions}
     
      onChange={handleMultiSelect}
    
      options={options}
      placeholder="select members"
      hideTokens
    /> */}
    <>
      {users.length > 0 ? (
        <Multiselect
          selectedOptions={selectedOptions}
          onChange={handleMultiSelect}
          options={options}
          placeholder="Select members"
          hideTokens
        />
      ) : (
        <p>No users available</p>
      )}
      {/* <Multiselect
        selectedOptions={selectedOptions}
        onChange={handleMultiSelect}
        options={options}
        placeholder="Select members"
        hideTokens
        renderOption={options.length > 0 ? undefined : () => <div>No users available</div>}
      /> */}
    </>
          <span style={{ minWidth: "130px", marginLeft: "1rem" }}>
            <Button
              variant="primary"
              onClick={handleAddMembers}
              disabled={selectedOptions.length ? false : true}
            >
              Assign
            </Button>
          </span>
          
        </div>
      </div>
      <br />
    </div>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            pagesCount={totalPages}
            onChange={({ detail }) =>
              setCurrentPageIndex(detail.currentPageIndex)}
          />
        }
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{
              pageSize: 10,
              contentDisplay: [
                { id: "username", visible: true },
                { id: "firstname", visible: true },
                { id: "lastname", visible: true },
                { id: "email", visible: true },
                { id: "actions", visible: true },
              ],
            }}
            pageSizePreference={{
              title: "Page size",
              options: [
                { value: 10, label: "10 resources" },
                { value: 20, label: "20 resources" },
              ],
            }}
          />
        }
      />

      {/* Add Member Modal */}
      {/* <Modal
        visible={isCreateModalOpen}
        onDismiss={() => setIsCreateModalOpen(false)}
        header="Allocate"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={handleAddMembers} variant="primary" disabled={selectedUsers.length===0}>
              Allocate
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          </SpaceBetween>
        }
      >
        <div  style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h4 style={{fontFamily: 'Arial, sans-serif', 
      fontSize: '20px'}}>Select Members to Allocate:</h4>
          <Table
            columnDefinitions={[
              {
                id: "select",
                header: "Select",
                cell: (item) => (
                  <Checkbox
                    checked={selectedUsers.some(
                      (selectedUser) => selectedUser.id === item.id
                    )}
                    onChange={() => {
                      if (
                        selectedUsers.some(
                          (selectedUser) => selectedUser.id === item.id
                        )
                      ) {
                        setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser.id !== item.id
                          )
                        );
                      } else {
                        setSelectedUsers([...selectedUsers, item]);
                      }
                    }}
                  />
                ),
              },
              {
                id: "username",
                header: "Username",
                cell: (item) => item.username,
              },
              {
                id: "firstname",
                header: "FirstName",
                cell: (item) => item.firstName,
              },
              {
                id: "lastname",
                header: "LastName",
                cell: (item) => item.lastName,
              },
            ]}
            items={users}
            trackBy="id"
            empty={<div>No users found</div>}
          />
        </div>
      </Modal> */}

      {/* Delete Member Modal */}
      <Modal
        visible={isDeleteModalOpen}
        onDismiss={() => setIsDeleteModalOpen(false)}
        header="Delete Member"
        footer={
          <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => handleDeleteMember(deleteMember)} variant="primary">
              Delete
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          </SpaceBetween>
          </Box>
        }
      >
        <p>Are you sure you want to delete {deleteMember?.username}?</p>
      </Modal>
      <Modal
        onDismiss={() => setShowDeleteConfirmation(false)}
        visible={showDeleteConfirmation}
        closeAriaLabel="Close modal"
        size="medium"
        header="Delete Selected Groups"
        footer={
          <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="primary" onClick={handleDeleteMultipleMembers}>
              Delete
            </Button>
            <Button variant="link" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </SpaceBetween></Box>
        }
      >
        Are you sure you want to delete the selected members?
      </Modal>

    </div>
  );
};

export default GroupDetails;


