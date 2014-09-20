using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace PNGMerge
{
    class Program
    {
        static void Main(string[] args)
        {

            String timestamp = args[0];
            //Console.WriteLine(timestamp);

            Bitmap p0 = new Bitmap(256*6, 256*6);
            Graphics g = Graphics.FromImage(p0);
            g.CompositingMode = CompositingMode.SourceCopy;

            for (int i = 0; i < 6; i++)
            {
                for (int j = 0; j < 7; j++)
                {
                    try
                    {
                        int x = 1648 + i;
                        int y = 441 + j;
                        Bitmap p1 = new Bitmap("data\\" + timestamp + "_" + x + "_" + y + ".png");
                        p1.MakeTransparent();
                        g.DrawImage(p1, new Point(i * 256, (6 - j) * 256));
                    }
                    catch (Exception e)
                    { }
                }
            }
                
            p0.Save("data\\"+timestamp+".png");
        }
    }
}
