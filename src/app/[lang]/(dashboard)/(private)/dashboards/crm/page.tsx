// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import Transactions from '@views/dashboards/crm/Transactions'
import TotalSales from '@views/dashboards/crm/TotalSales'
import RevenueReport from '@views/dashboards/crm/RevenueReport'
import CardWidgetsSalesOverview from '@views/dashboards/crm/SalesOverview'
import ActivityTimeline from '@views/dashboards/crm/ActivityTimeline'
import WeeklySales from '@views/dashboards/crm/WeeklySales'
import LineAreaChart from '@views/dashboards/crm/LineAreaChart'
import DashboardDateFilter from '@views/dashboards/crm/DashboardDateFilter'

const DashboardCRM = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <DashboardDateFilter />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Transactions />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TotalSales />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <RevenueReport />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CardWidgetsSalesOverview />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ActivityTimeline />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <WeeklySales />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 6, sm: 12 }}>
                <LineAreaChart />
              </Grid>
            
            </Grid>
          </Grid>
        </Grid>
      </Grid>
   
   
  
    </Grid>
  )
}

export default DashboardCRM
