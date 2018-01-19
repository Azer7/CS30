using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;

using System.Net;
using System.IO;
using System.Text.RegularExpressions;
using System.Globalization;

namespace CatSpeak
{
    public partial class Form1 : Form
    {
        Dictionary<string, string> kittenDict = new Dictionary<string, string>()
        {
            { "ver", "fur" },
            { "fer", "fur" },
            { "for", "fur" },
            { "full", "furll" },
            { "ket", "cat" },
            { "my name is", "my owners call me" },
            { "user", "cat" },
            {"users", "cats" },
            {"beta testers", "the nerdy cats" },
            {"pow", "paw" },
            {"fr", "furr" },
            {"Hi", "Meow!😸" },
            {"hi", "meow!😸" },
            {"Yo", "Meeow!😸" },
            {"yo", "meeow!😸" },
            {"Hai", "Meow :3" },
            {"hai", "meow :3" },
            {"Hello","Meow?" },
            {"hello", "meow?" },
            {"Hey", "Mew!" },
            {"hey", "mew!" },
            {"arr", "purr" },
            {"awesome", "pawsome" },
            {"do homework", "sleep"},
            {"work", "sleep"},
            {"do", "sleep through"},
            {"great", "as great as catnip" },
            {"good", "meow-velous" },
            {"er", "epurr" },
            {"were", "wrrr"},
            {"ber", "purr" },
            {"per", "purr" },
            {"%", "purrcent" },
            {"thanks", "thanks ^.^" },
            {"thank you", "ty ^.^" },
            {"from", "furom" },
            {"From", "Furom" },
            {"feeling", "feline" },
            {"product", "purr-oduct" },
            {"mou", "meow" },
            {"team", "litter" },
            {"followers", "litter" },
            {"people", "cats" },
            {"kidding", "kitten"},
            {"say", "meow" },
            {"saying", "meowing" },
            {"said", "meowed" },
            {"awesomeness", "pawesomeness"},
            {"aw", "paw" },
            {"getting", "kitten" },
            {"yell", "hiss" },
            {"food", "catnip" },
            {"run", "pounce" },
            {"jump", "pounce"},
            {"got", "cat" },
            {"know", "meow" },
            {"now", "meow" },
            {"move", "mewv" },
            {"amazing", "ameowsing" },
            {"marvelous", "meowvelous" },
            {"connected", "catnected" },
            {"leap", "pounce" },
            {"hows it going", "whats catalakin" },
            {"whats up", "whats catalakin" },
            {"no", "hiss no" },
            {"garbage", "litter box" }
        };


        KeyboardHook hook = new KeyboardHook();


        [DllImport("user32.dll", SetLastError = true)]
        static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);

        [DllImport("user32.dll")]
        static extern bool UnregisterHotKey(IntPtr hWnd, int id);


        public const int KEYEVENTF_EXTENDEDKEY = 0x0001; //Key down flag
        public const int KEYEVENTF_KEYUP = 0x0002; //Key up flag
        public const int VK_LCONTROL = 0xA2; //Left Control key code
        public const int A = 0x41; //A key code
        public const int C = 0x43; //C key code
        public const int VK_SHIFT = 0x10;

        public Form1()
        {
            //InitializeComponent();

            hook.KeyPressed += new EventHandler<KeyPressedEventArgs>(hook_enterIntercept);
            // register the control + alt + F12 combination as hot key.
            //hook.RegisterHotKey((ModifierKeys)1,
            //    Keys.C);
            hook.RegisterHotKey(0, Keys.Enter);
        }

        private async void hook_enterIntercept(object sender, KeyPressedEventArgs e)
        {
            string type = "text";

            Stream clipAudio = (null);
            Image clipImage = (null);
            string clipText = String.Empty;

            clipText = Clipboard.GetText();

            SendKeys.SendWait("^a");
            SendKeys.SendWait("^c");

            if (await GetClipboard(clipText))
            {
                string sendText = Clipboard.GetText();
                if (!sendText.EndsWith(".com") && !sendText.EndsWith("*"))
                {                   
                    Clipboard.Clear();
                    Clipboard.SetText(kittify(sendText));

                    SendKeys.SendWait("^v");
                }
                hook.Unregister();
                SendKeys.SendWait("{ENTER}");
                hook.RegisterHotKey(0, Keys.Enter);
                if (type == "audio")
                    Clipboard.SetAudio(clipAudio);
                else if (type == "image")
                    Clipboard.SetImage(clipImage);
                else if (type == "text" && clipText != (null))
                    Clipboard.SetText(clipText);
            }
            else
            {
                hook.Unregister();
                SendKeys.SendWait("{ENTER}");
                hook.RegisterHotKey(0, Keys.Enter);
            }
        }

        private async Task<bool> GetClipboard(string oldText)
        {
            bool success = false;
            int counter = 0;

            while (counter < 200)
            {
                if (Clipboard.GetText() != oldText)
                {
                    success = true;
                    break;
                }
                await Task.Delay(25);
                counter += 25;
            }
            return success;
        }

        string kittify(string str)
        {
            StringBuilder kittenSB = new StringBuilder(str);

            foreach (KeyValuePair<string, string> entry in kittenDict)
            {
                kittenSB.Replace(entry.Key, entry.Value);
            }

            return kittenSB.ToString();
        }

        //void hook_CatFact(object sender, KeyPressedEventArgs e)
        //{
        //    string html = string.Empty;
        //    string url = @"https://icanhazdadjoke.com/slack";

        //    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
        //    request.AutomaticDecompression = DecompressionMethods.GZip;

        //    using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
        //    using (Stream stream = response.GetResponseStream())
        //    using (StreamReader reader = new StreamReader(stream))
        //    {
        //        html = reader.ReadToEnd();
        //    }

        //    //Regex r = new Regex(@"""fallback"":(.*?)\,\ \n      ""footer"":");
        //    Regex r = new Regex(@"(?<=""fallback"": "")(.*?)(?=""\,\ \n      ""footer"":)");

        //    Match m = r.Match(html);

        //    string text = m.Groups[0].Value;

        //    string type = "";

        //    Stream clipAudio = (null);
        //    Image clipImage = (null);
        //    string clipText = "";

        //    if (Clipboard.ContainsAudio())
        //    {
        //        type = "audio";
        //        clipAudio = Clipboard.GetAudioStream();
        //    }
        //    else if (Clipboard.ContainsImage())
        //    {
        //        type = "image";
        //        clipImage = Clipboard.GetImage();
        //    }
        //    else if (Clipboard.ContainsText())
        //    {
        //        type = "text";
        //        clipText = Clipboard.GetText();
        //    }

        //    Clipboard.SetText(DecodeUString(text).Replace("\\", ""));

        //    SendKeys.SendWait("^v");

        //    if (type == "audio")
        //        Clipboard.SetAudio(clipAudio);
        //    else if (type == "image")
        //        Clipboard.SetImage(clipImage);
        //    else if (type == "text")
        //        Clipboard.SetText(clipText);
        //}

        static string DecodeUString(string value)
        {
            return Regex.Replace(
                value,
                @"\\u(?<Value>[a-zA-Z0-9]{4})",
                m =>
                {
                    return ((char)int.Parse(m.Groups["Value"].Value, NumberStyles.HexNumber)).ToString();
                }).Replace("\r\n", "\n");
        }
    }
}



public sealed class KeyboardHook : IDisposable
{
    // Registers a hot key with Windows.
    [DllImport("user32.dll")]
    private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);
    // Unregisters the hot key with Windows.
    [DllImport("user32.dll")]
    private static extern bool UnregisterHotKey(IntPtr hWnd, int id);

    /// <summary>
    /// Represents the window that is used internally to get the messages.
    /// </summary>
    private class Window : NativeWindow, IDisposable
    {
        private static int WM_HOTKEY = 0x0312;

        public Window()
        {
            // create the handle for the window.
            this.CreateHandle(new CreateParams());
        }

        /// <summary>
        /// Overridden to get the notifications.
        /// </summary>
        /// <param name="m"></param>
        protected override void WndProc(ref Message m)
        {
            base.WndProc(ref m);

            // check if we got a hot key pressed.
            if (m.Msg == WM_HOTKEY)
            {
                // get the keys.
                Keys key = (Keys)(((int)m.LParam >> 16) & 0xFFFF);
                ModifierKeys modifier = (ModifierKeys)((int)m.LParam & 0xFFFF);

                // invoke the event to notify the parent.
                if (KeyPressed != null)
                    KeyPressed(this, new KeyPressedEventArgs(modifier, key));
            }
        }

        public event EventHandler<KeyPressedEventArgs> KeyPressed;

        #region IDisposable Members

        public void Dispose()
        {
            this.DestroyHandle();
        }

        #endregion
    }

    private Window _window = new Window();
    private int _currentId;

    public KeyboardHook()
    {
        // register the event of the inner native window.
        _window.KeyPressed += delegate (object sender, KeyPressedEventArgs args)
        {
            if (KeyPressed != null)
                KeyPressed(this, args);
        };
    }

    /// <summary>
    /// Registers a hot key in the system.
    /// </summary>
    /// <param name="modifier">The modifiers that are associated with the hot key.</param>
    /// <param name="key">The key itself that is associated with the hot key.</param>
    public void RegisterHotKey(ModifierKeys modifier, Keys key)
    {
        // increment the counter.
        _currentId = _currentId + 1;

        // register the hot key.
        if (!RegisterHotKey(_window.Handle, _currentId, (uint)modifier, (uint)key))
        {
            MessageBox.Show("Hotkey (Shift & 'delete') already registered: \nProgram probably already running!");
            throw new InvalidOperationException("Couldn’t register the hot key.");
        }
    }

    /// <summary>
    /// A hot key has been pressed.
    /// </summary>
    public event EventHandler<KeyPressedEventArgs> KeyPressed;

    #region IDisposable Members

    public void Dispose()
    {
        // unregister all the registered hot keys.
        Unregister();

        // dispose the inner native window.
        _window.Dispose();
    }

    public void Unregister()
    {
        for (int i = _currentId; i > 0; i--)
        {
            UnregisterHotKey(_window.Handle, i);
        }
        _currentId = 0;
    }

    #endregion
}

public class KeyPressedEventArgs : EventArgs
{
    private ModifierKeys _modifier;
    private Keys _key;

    internal KeyPressedEventArgs(ModifierKeys modifier, Keys key)
    {
        _modifier = modifier;
        _key = key;
    }

    public ModifierKeys Modifier
    {
        get { return _modifier; }
    }

    public Keys Key
    {
        get { return _key; }
    }
}

/// <summary>
/// The enumeration of possible modifiers.
/// </summary>
[Flags]
public enum ModifierKeys : uint
{
    Alt = 1,
    Control = 2,
    Shift = 4,
    Win = 8
}