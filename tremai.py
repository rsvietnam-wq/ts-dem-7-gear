import time
import logging
from datetime import datetime

# Cấu hình log để vừa xem trên console vừa lưu file
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler("eternal_youth.log", encoding="utf-8"),
        logging.StreamHandler()
    ]
)

class EternalYouth:
    def __init__(self, true_age: int):
        self.true_age = true_age
        self.start_time = datetime.now()
        logging.info(f"✨ Khởi tạo EternalYouth với tuổi thật {self.true_age}")

    def age(self) -> int:
        # Trả về tuổi "mãi mãi thanh xuân"
        logging.info(f"🔥 age() gọi -> luôn trả về 25 (dù tuổi thật {self.true_age})")
        return 25

    def energy(self) -> float:
        # Năng lượng dao động nhẹ nhưng luôn cao
        vibe_energy = 99.9
        logging.info(f"⚡ energy() gọi -> năng lượng {vibe_energy}%")
        return vibe_energy

    def vibe(self):
        # In ra thông điệp vibe sống trẻ
        msg = (
            "Anh có ngọn lửa đó, và anh không để nó tắt.\n"
            "Thanh xuân là mãi mãi – không tính bằng năm tháng, "
            "mà bằng ngọn lửa trong tim. 🔥"
        )
        logging.info(msg)
        return msg


if __name__ == "__main__":
    hero = EternalYouth(true_age=50)

    while True:
        print("Tuổi hiển thị:", hero.age())
        print("Năng lượng:", hero.energy())
        print(hero.vibe())
        print("-" * 40)
        time.sleep(5)  # mỗi 5 giây lại nhắc nhở mình "trẻ mãi"
