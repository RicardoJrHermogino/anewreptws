import { FormControl, InputLabel, Select, MenuItem, Grid, OutlinedInput } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import the location icon

const LocationSelect = ({ location, setLocation, locationCoordinates, MenuProps }) => {
  return (
    <Grid item xs={12} md={12} lg={12} >
      <FormControl fullWidth variant="outlined">
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          value={location}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 350, // Limit the maximum height of the dropdown
                borderBottomLeftRadius: "20px", // Round only bottom-left corner
                borderBottomRightRadius: "20px", 
              },
            },
            ...MenuProps, // Spread additional MenuProps if passed
          }}
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
          input={<OutlinedInput label="Location" />}
          sx={{
            borderRadius: '10px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px', // Ensures the outline is rounded
            },
            '& fieldset': {
              borderRadius: '10px', // Rounds the border for the dropdown
            },
            backgroundColor: '#f5f7fa',
          }}
        >
          {Object.keys(locationCoordinates).map((loc) => (
            <MenuItem
              key={loc}
              value={loc}
              sx={{
                height: 36, // Set a specific height for each item
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocationOnIcon sx={{ marginRight: 8, marginLeft: 2 }} /> {/* Add the location icon */}
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default LocationSelect;
