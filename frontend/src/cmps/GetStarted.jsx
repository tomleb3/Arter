import { Tabs, Tab, Paper } from '@material-ui/core';

export function GetStarted() {

    return <article className="get-started">
        <Paper square>
            <Tabs
            // centered
                // value={value}
                indicatorColor="primary"
                textColor="primary"
                // onChange={handleChange}
                variant="fullWidth"
            >
                <Tab label="Buyers" />
                <Tab label="Sellers" />
            </Tabs>
        </Paper>
    </article>
}