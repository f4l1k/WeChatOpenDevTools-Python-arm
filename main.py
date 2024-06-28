
from argparse import RawTextHelpFormatter
from utils.commons import Commons
from utils.banner import generate_banner
from utils.colors import Color



def print_colored_message(message, color):
    print(color + message + Color.END)

def main():
    commons.load_wechatEx_configs()

if __name__ == "__main__":
    generate_banner()
    commons = Commons()
    main()
    
    
