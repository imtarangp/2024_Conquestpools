using System;
using System.Linq;
using System.Net;
using System.Net.Sockets;

namespace CoreLibrary
{

    public class MainUtility
    {
        /// <summary>
        /// Converts Base 64 string to byte data Array
        /// </summary>
        /// <returns>return byte of data</returns>
        public static byte[] FromBase64Url(string base64Url)
        {
            string padded = base64Url.Length % 4 == 0 ? base64Url : base64Url + "====".Substring(base64Url.Length % 4);
            string base64 = padded.Replace("_", "/").Replace("-", "+");
            return Convert.FromBase64String(base64);
        }

        public static string GetOperatingSystem()
        {
            OperatingSystem os = Environment.OSVersion;
            return os.Platform.ToString();
            //var version = os.Version.ToString();
            //var servicePack = os.ServicePack.ToString();
        }
        public static string GetIP()
        {
            string ip = Dns.GetHostAddresses(Dns.GetHostName()).First(a => a.AddressFamily == AddressFamily.InterNetwork).ToString();
            return ip;
        }
    }
}
