class User < ApplicationRecord
  has_many :workouts, dependent: :destroy
  has_many :friendships, dependent: :destroy
  
  has_secure_password

  validates :username, presence: true, uniqueness: true, length: {minimum: 4}
  validates :password, length: {minimum: 5}

  def self.from_omniauth(auth)                 
    self.find_or_create_by(provider: auth.fetch(:provider), username: auth.fetch(:username)) do |u|
      u.username = auth.fetch(:username)
      u.password = SecureRandom.hex(20)
      u.provider = auth.fetch(:provider)
  end
  end  
end
