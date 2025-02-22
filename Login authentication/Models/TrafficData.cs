namespace Login_authentication.Models
{
    public class TrafficData
    {
        public List<int> VisitorsPerMonth { get; set; }
        public List<int> DailyClicks { get; set; }
        public TrafficSources TrafficSources { get; set; }
    }

    public class TrafficSources
    {
        public int Direct { get; set; }
        public int Search { get; set; }
        public int Social { get; set; }
    }

}
