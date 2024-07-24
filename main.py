
from argparse import RawTextHelpFormatter
from utils.commons import Commons
from utils.banner import generate_banner
from utils.colors import Color
import argparse


def print_colored_message(message, color):
    print(color + message + Color.END)

def main():
    HELPALL = """
    请选择要执行的方法：         
                        [+] python  main.py -h  查看帮助
                        [+] python  main.py -p  指定pid              
                                     
    """
    parser = argparse.ArgumentParser(description=HELPALL, formatter_class=RawTextHelpFormatter)
    parser.add_argument('-p', help='指定pid',dest="pid", type=int)
    args = parser.parse_args()

    if args.pid:
        commons.load_wechatEx_configs_pid(args.pid)
    else:
        commons.load_wechatEx_configs()
        

if __name__ == "__main__":
    generate_banner()
    commons = Commons()
    main()
    
    
